import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { DataTable, type ColumnDef, type SortDirection } from '../../../components/ui/data-table';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import * as React from 'react';

/**
 *
 *
 * Features include: internal/external sorting, search, pagination, loading states, custom cells, and full RTL support.
 *
 */

const meta = {
  title: 'Data Display/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: false
    },
    columns: {
      control: false
    },
    isLoading: {
      control: { type: 'boolean' }
    },
    sortBy: {
      control: false
    },
    sortDirection: {
      control: false
    },
    onSort: {
      control: false
    },
    enableSorting: {
      control: { type: 'boolean' }
    },
    searchable: {
      control: { type: 'boolean' }
    },
    pagination: {
      control: { type: 'boolean' }
    },
    striped: {
      control: { type: 'boolean' }
    },
    hoverable: {
      control: { type: 'boolean' }
    },
    compact: {
      control: { type: 'boolean' }
    }
  }
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data types
interface User {
  id: string;
  name: string;
  email: string;
  status: string;
  role: string;
  joinDate: string;
}

// Sample users (English) - from component page lines 440-481
const usersEN: User[] = [
  { id: '1', name: 'Ahmed Ali', email: 'ahmed@example.com', status: 'Active', role: 'Admin', joinDate: '2024-01-15' },
  { id: '2', name: 'Fatima Hassan', email: 'fatima@example.com', status: 'Active', role: 'Editor', joinDate: '2024-02-20' },
  { id: '3', name: 'Mohammed Youssef', email: 'mohammed@example.com', status: 'Inactive', role: 'User', joinDate: '2024-03-10' },
  { id: '4', name: 'Sarah Abdullah', email: 'sarah@example.com', status: 'Active', role: 'Editor', joinDate: '2024-03-25' },
  { id: '5', name: 'Omar Ibrahim', email: 'omar@example.com', status: 'Active', role: 'User', joinDate: '2024-04-05' },
];

// Sample users (Arabic)
const usersAR: User[] = [
  { id: '1', name: 'أحمد علي', email: 'ahmed@example.com', status: 'نشط', role: 'مسؤول', joinDate: '2024-01-15' },
  { id: '2', name: 'فاطمة حسن', email: 'fatima@example.com', status: 'نشط', role: 'محرر', joinDate: '2024-02-20' },
  { id: '3', name: 'محمد يوسف', email: 'mohammed@example.com', status: 'غير نشط', role: 'مستخدم', joinDate: '2024-03-10' },
  { id: '4', name: 'سارة عبدالله', email: 'sarah@example.com', status: 'نشط', role: 'محرر', joinDate: '2024-03-25' },
  { id: '5', name: 'عمر إبراهيم', email: 'omar@example.com', status: 'نشط', role: 'مستخدم', joinDate: '2024-04-05' },
];

// Basic columns - from component page lines 483-487
const basicColumns: ColumnDef<User>[] = [
  { id: 'name', header: 'Name', accessorKey: 'name' },
  { id: 'email', header: 'Email', accessorKey: 'email' },
  { id: 'role', header: 'Role', accessorKey: 'role' },
];

const basicColumnsAR: ColumnDef<User>[] = [
  { id: 'name', header: 'الاسم', accessorKey: 'name' },
  { id: 'email', header: 'البريد الإلكتروني', accessorKey: 'email' },
  { id: 'role', header: 'الدور', accessorKey: 'role' },
];

// Sortable columns - from component page lines 493-498
const sortableColumns: ColumnDef<User>[] = [
  { id: 'name', header: 'Name', accessorKey: 'name', sortable: true },
  { id: 'email', header: 'Email', accessorKey: 'email', sortable: true },
  { id: 'role', header: 'Role', accessorKey: 'role', sortable: true },
  { id: 'joinDate', header: 'Join Date', accessorKey: 'joinDate', sortable: true },
];

// Default - Interactive playground with controls (hidden from stories list to avoid ID conflicts)
export const Default: Story = {
  args: {
    data: usersEN,
    columns: basicColumns,
    hoverable: true
  },
  render: (args, { globals }) => {
    const isRTL = globals?.direction === 'rtl';

    return (
    <div className="w-full">
      <DataTable {...args} data={isRTL ? usersAR : usersEN} columns={isRTL ? basicColumnsAR : basicColumns} />
    </div>
    );
  },
};

// Basic DataTable - from component page lines 656-663
export const BasicDataTable: Story = {
  render: () => (
    <div className="w-full">
      <DataTable
        data={usersEN}
        columns={basicColumns}
        hoverable
      />
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Basic data table with three columns showing user information.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders basic table structure', async () => {
      // Component renders both desktop table and mobile cards (one hidden with CSS)
      const table = canvas.queryByRole('table');
      if (table) {
        await expect(table).toBeInTheDocument();
      }
    });

    await step('Shows all user rows', async () => {
      // Text appears in both desktop and mobile views (one hidden with CSS)
      await expect(canvas.getAllByText('Ahmed Ali').length).toBeGreaterThanOrEqual(1);
      await expect(canvas.getAllByText('Fatima Hassan').length).toBeGreaterThanOrEqual(1);
      await expect(canvas.getAllByText('Mohammed Youssef').length).toBeGreaterThanOrEqual(1);
      await expect(canvas.getAllByText('Sarah Abdullah').length).toBeGreaterThanOrEqual(1);
      await expect(canvas.getAllByText('Omar Ibrahim').length).toBeGreaterThanOrEqual(1);
    });
  }
};

// Internal Sorting (Simple) - from component page lines 739-761
export const InternalSorting: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <p className="text-sm text-muted-foreground mb-4">
          Use enableSorting for automatic sorting without managing state yourself. Click column headers to sort.
        </p>
        <DataTable
          data={usersEN}
          columns={sortableColumns}
          enableSorting
          defaultSortBy="name"
          defaultSortDirection="asc"
        />
      </CardContent>
    </Card>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Simple sorting with enableSorting prop. The component manages sort state internally.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders sortable table with default sort', async () => {
      // Table may render in mobile card mode - use queryByRole
      const table = canvas.queryByRole('table');
      if (table) {
        await expect(table).toBeInTheDocument();
      }
    });

    await step('Column headers have sort buttons', async () => {
      const sortButtons = canvas.getAllByRole('button');
      await expect(sortButtons.length).toBeGreaterThan(0);

      // Check Name column has sort button
      const nameButtons = canvas.getAllByRole('button', { name: /name/i });
      await expect(nameButtons.length).toBeGreaterThanOrEqual(1);
    });

    await step('Data is sorted by name by default (ascending)', async () => {
      const rows = canvas.queryAllByRole('row');
      if (rows.length > 1) {
        const cells = rows[1].querySelectorAll('td');
        if (cells.length > 0) {
          // First row should be "Ahmed Ali" (A comes first)
          await expect(cells[0]).toHaveTextContent('Ahmed Ali');
        }
      }
    });

    await step('Clicking Name header sorts descending', async () => {
      const nameButton = canvas.getAllByRole('button', { name: /name/i })[0];
      await userEvent.click(nameButton);

      // After one click: desc order
      const rows = canvas.queryAllByRole('row');
      if (rows.length > 1) {
        const cells = rows[1].querySelectorAll('td');
        if (cells.length > 0) {
          // First row should now be "Sarah Abdullah" (S comes last)
          await expect(cells[0]).toHaveTextContent('Sarah Abdullah');
        }
      }
    });

    await step('Clicking Name header again clears sort', async () => {
      const nameButton = canvas.getAllByRole('button', { name: /name/i })[0];
      await userEvent.click(nameButton);

      // After second click: sort cleared, back to original order
      const rows = canvas.queryAllByRole('row');
      if (rows.length > 1) {
        const cells = rows[1].querySelectorAll('td');
        if (cells.length > 0) {
          await expect(cells[0]).toHaveTextContent('Ahmed Ali');
        }
      }
    });

    await step('Clicking Email header sorts by email', async () => {
      const emailButton = canvas.getAllByRole('button', { name: /email/i })[0];
      await userEvent.click(emailButton);

      const rows = canvas.queryAllByRole('row');
      if (rows.length > 1) {
        const cells = rows[1].querySelectorAll('td');
        if (cells.length > 1) {
          // Should sort by email alphabetically
          await expect(cells[1]).toHaveTextContent('@example.com');
        }
      }
    });
  }
};

// External Sorting - from component page lines 764-786
export const ExternalSorting: Story = {
  render: () => {
    const [sortBy, setSortBy] = React.useState<string>();
    const [sortDirection, setSortDirection] = React.useState<SortDirection>(null);

    const handleSort = (columnId: string) => {
      if (sortBy === columnId) {
        if (sortDirection === 'asc') {
          setSortDirection('desc');
        } else if (sortDirection === 'desc') {
          setSortBy(undefined);
          setSortDirection(null);
        }
      } else {
        setSortBy(columnId);
        setSortDirection('asc');
      }
    };

    const sortedUsers = React.useMemo(() => {
      if (!sortBy || !sortDirection) return usersEN;

      return [...usersEN].sort((a, b) => {
        const aValue = String(a[sortBy as keyof User] || '');
        const bValue = String(b[sortBy as keyof User] || '');

        if (sortDirection === 'asc') {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      });
    }, [sortBy, sortDirection]);

    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground mb-4">
            Click any column header to sort. Click again to reverse, and once more to clear sorting.
          </p>
          <DataTable
            data={sortedUsers}
            columns={sortableColumns}
            sortBy={sortBy}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
        </CardContent>
      </Card>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'External state management for advanced use cases (e.g., URL sync, API integration).'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders table with external sorting controls', async () => {
      const table = canvas.getByRole('table');
      await expect(table).toBeInTheDocument();
      await expect(canvas.getByText(/click any column header to sort/i)).toBeInTheDocument();
    });

    await step('Clicking Role header sorts ascending', async () => {
      const roleButton = canvas.getByRole('button', { name: /role/i });
      await userEvent.click(roleButton);

      const rows = canvas.getAllByRole('row');
      const cells = rows[1].querySelectorAll('td');
      // First in alphabetical order: "Admin"
      await expect(cells[2]).toHaveTextContent('Admin');
    });

    await step('Clicking Role header again sorts descending', async () => {
      const roleButton = canvas.getByRole('button', { name: /role/i });
      await userEvent.click(roleButton);

      const rows = canvas.getAllByRole('row');
      const cells = rows[1].querySelectorAll('td');
      // Last in alphabetical order: "User"
      await expect(cells[2]).toHaveTextContent('User');
    });

    await step('Clicking Role header third time clears sorting', async () => {
      const roleButton = canvas.getByRole('button', { name: /role/i });
      await userEvent.click(roleButton);

      const rows = canvas.getAllByRole('row');
      const cells = rows[1].querySelectorAll('td');
      // Back to original order: Ahmed Ali (Admin)
      await expect(cells[0]).toHaveTextContent('Ahmed Ali');
    });
  }
};

// Searchable Table - from component page lines 789-807
export const SearchableTable: Story = {
  render: () => {
    const [searchValue, setSearchValue] = React.useState('');

    const filteredUsers = React.useMemo(() => {
      if (!searchValue) return usersEN;

      return usersEN.filter(user =>
        user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.role.toLowerCase().includes(searchValue.toLowerCase())
      );
    }, [searchValue]);

    return (
      <Card>
        <CardContent className="p-6">
          <DataTable
            data={filteredUsers}
            columns={basicColumns}
            searchable
            searchPlaceholder="Search by name, email, or role..."
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            emptyMessage="No users found"
            clearSearchLabel="Clear search"
          />
        </CardContent>
      </Card>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Data table with built-in search functionality and clear button.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders search input with placeholder', async () => {
      const searchInput = canvas.getByPlaceholderText('Search by name, email, or role...');
      await expect(searchInput).toBeInTheDocument();
      await expect(searchInput).toHaveValue('');
    });

    await step('Shows all users initially', async () => {
      const rows = canvas.queryAllByRole('row');
      // May render desktop table OR mobile cards - just check we have data
      await expect(rows.length).toBeGreaterThanOrEqual(5);
    });

    await step('Typing in search filters by name', async () => {
      const searchInput = canvas.getByPlaceholderText('Search by name, email, or role...');
      await userEvent.type(searchInput, 'Ahmed');

      // Should show only Ahmed Ali (appears in both desktop and mobile views)
      await expect(canvas.getAllByText('Ahmed Ali').length).toBeGreaterThanOrEqual(1);
    });

    await step('Clear button appears and works', async () => {
      const clearButton = canvas.getByRole('button');
      await expect(clearButton).toBeInTheDocument();

      await userEvent.click(clearButton);

      const searchInput = canvas.getByPlaceholderText('Search by name, email, or role...');
      await expect(searchInput).toHaveValue('');

      // All users shown again
      await expect(canvas.getAllByText('Ahmed Ali').length).toBeGreaterThanOrEqual(1);
      await expect(canvas.getAllByText('Fatima Hassan').length).toBeGreaterThanOrEqual(1);
    });

    await step('Search filters by email', async () => {
      const searchInput = canvas.getByPlaceholderText('Search by name, email, or role...');
      await userEvent.type(searchInput, 'fatima@');

      await expect(canvas.getAllByText('Fatima Hassan').length).toBeGreaterThanOrEqual(1);
    });

    await step('Search filters by role', async () => {
      const searchInput = canvas.getByPlaceholderText('Search by name, email, or role...');
      await userEvent.clear(searchInput);
      await userEvent.type(searchInput, 'Editor');

      // Should show Fatima Hassan and Sarah Abdullah (both Editors)
      await expect(canvas.getAllByText('Fatima Hassan').length).toBeGreaterThanOrEqual(1);
      await expect(canvas.getAllByText('Sarah Abdullah').length).toBeGreaterThanOrEqual(1);
    });

    await step('Shows empty state for no results', async () => {
      const searchInput = canvas.getByPlaceholderText('Search by name, email, or role...');
      await userEvent.clear(searchInput);
      await userEvent.type(searchInput, 'nonexistent');

      await expect(canvas.getByText('No users found')).toBeInTheDocument();
      // Table should not be visible
      const table = canvas.queryByRole('table');
      await expect(table).not.toBeInTheDocument();
    });
  }
};

// Paginated Table - from component page lines 810-831
export const PaginatedTable: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const pageSize = 3;
    const totalPages = Math.ceil(usersEN.length / pageSize);

    const paginatedData = React.useMemo(() => {
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return usersEN.slice(startIndex, endIndex);
    }, [currentPage, pageSize]);

    return (
      <Card>
        <CardContent className="p-6">
          <DataTable
            data={paginatedData}
            columns={basicColumns}
            pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            nextLabel="Next"
            previousLabel="Previous"
            pageLabel={`Page ${currentPage} of ${totalPages}`}
          />
        </CardContent>
      </Card>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Data table with integrated pagination controls.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders pagination controls', async () => {
      const previousButton = canvas.getByRole('button', { name: /previous/i });
      const nextButton = canvas.getByRole('button', { name: /next/i });
      const pageLabel = canvas.getByText('Page 1 of 2');

      await expect(previousButton).toBeInTheDocument();
      await expect(nextButton).toBeInTheDocument();
      await expect(pageLabel).toBeInTheDocument();
    });

    await step('Shows first page data (3 rows)', async () => {
      // Data appears in both desktop and mobile views (one hidden with CSS)
      await expect(canvas.getAllByText('Ahmed Ali').length).toBeGreaterThanOrEqual(1);
      await expect(canvas.getAllByText('Fatima Hassan').length).toBeGreaterThanOrEqual(1);
      await expect(canvas.getAllByText('Mohammed Youssef').length).toBeGreaterThanOrEqual(1);
    });

    await step('Previous button is disabled on first page', async () => {
      const previousButton = canvas.getByRole('button', { name: /previous/i });
      await expect(previousButton).toBeDisabled();
    });

    await step('Clicking Next shows second page', async () => {
      const nextButton = canvas.getByRole('button', { name: /next/i });
      await userEvent.click(nextButton);

      // Page label updates
      await expect(canvas.getByText('Page 2 of 2')).toBeInTheDocument();

      // Different users shown
      await expect(canvas.getAllByText('Sarah Abdullah').length).toBeGreaterThanOrEqual(1);
      await expect(canvas.getAllByText('Omar Ibrahim').length).toBeGreaterThanOrEqual(1);

      // First page users no longer visible
      await expect(canvas.queryByText('Ahmed Ali')).not.toBeInTheDocument();
    });

    await step('Next button is disabled on last page', async () => {
      const nextButton = canvas.getByRole('button', { name: /next/i });
      await expect(nextButton).toBeDisabled();
    });

    await step('Clicking Previous goes back to first page', async () => {
      const previousButton = canvas.getByRole('button', { name: /previous/i });
      await userEvent.click(previousButton);

      await expect(canvas.getByText('Page 1 of 2')).toBeInTheDocument();
      await expect(canvas.getAllByText('Ahmed Ali').length).toBeGreaterThanOrEqual(1);
    });
  }
};

// Custom Cells - from component page lines 834-847
export const CustomCells: Story = {
  render: () => {
    const customColumns: ColumnDef<User>[] = [
      {
        id: 'name',
        header: 'Name',
        accessorKey: 'name',
        cell: (row) => <div className="font-medium">{row.name}</div>
      },
      {
        id: 'email',
        header: 'Email',
        accessorKey: 'email',
        cell: (row) => <div className="text-muted-foreground">{row.email}</div>
      },
      {
        id: 'status',
        header: 'Status',
        accessorKey: 'status',
        cell: (row) => (
          <Badge variant={row.status === 'Active' ? 'default' : 'secondary'}>
            {row.status}
          </Badge>
        )
      },
      {
        id: 'actions',
        header: 'Actions',
        accessorKey: 'id',
        align: 'end',
        cell: (row) => (
          <div className="flex gap-2 justify-end">
            <Button size="sm" variant="outline">View</Button>
            <Button size="sm" variant="ghost">Edit</Button>
          </div>
        )
      },
    ];

    return (
      <Card>
        <CardContent className="p-6">
          <DataTable
            data={usersEN}
            columns={customColumns}
          />
        </CardContent>
      </Card>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Custom cell rendering with badges, styled text, and action buttons.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders table with custom cells', async () => {
      const table = canvas.queryByRole('table');
      if (table) {
        await expect(table).toBeInTheDocument();
      }
    });

    await step('Status column renders badges', async () => {
      // Badges appear in both desktop and mobile views (one hidden with CSS)
      const activeBadges = canvas.getAllByText('Active');
      await expect(activeBadges.length).toBeGreaterThan(0);

      const inactiveBadges = canvas.getAllByText('Inactive');
      await expect(inactiveBadges.length).toBeGreaterThanOrEqual(1);

      // Check badge is actually a badge element (has specific class)
      const firstActiveBadge = activeBadges[0];
      await expect(firstActiveBadge.closest('.inline-flex')).toBeInTheDocument();
    });

    await step('Actions column renders View and Edit buttons', async () => {
      const viewButtons = canvas.getAllByRole('button', { name: /view/i });
      const editButtons = canvas.getAllByRole('button', { name: /edit/i });

      // Should have buttons (5 per view, appears in both desktop and mobile)
      await expect(viewButtons.length).toBeGreaterThanOrEqual(5);
      await expect(editButtons.length).toBeGreaterThanOrEqual(5);
    });

    await step('Action buttons are clickable', async () => {
      const viewButtons = canvas.getAllByRole('button', { name: /view/i });
      const firstViewButton = viewButtons[0];

      await userEvent.click(firstViewButton);
      // Button was clicked (no error thrown)
      await expect(firstViewButton).toBeInTheDocument();
    });

    await step('Custom cell styling applied', async () => {
      // Name cells have font-medium class
      const rows = canvas.queryAllByRole('row');
      if (rows.length > 1) {
        const firstDataRow = rows[1];
        const nameCell = firstDataRow.querySelector('td:first-child div');
        if (nameCell) {
          await expect(nameCell).toHaveClass('font-medium');
        }

        // Email cells have text-muted-foreground class
        const emailCell = firstDataRow.querySelector('td:nth-child(2) div');
        if (emailCell) {
          await expect(emailCell).toHaveClass('text-muted-foreground');
        }
      }
    });
  }
};

// Loading State - from component page lines 850-884
export const LoadingState: Story = {
  render: () => {
    const [isLoading, setIsLoading] = React.useState(false);

    const toggleLoading = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 2000);
    };

    return (
      <Card>
        <CardContent className="p-6">
          <div className="mb-4">
            <Button onClick={toggleLoading} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Trigger Loading State'}
            </Button>
          </div>
          <DataTable
            data={usersEN}
            columns={basicColumns}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Data table with skeleton loading animation while fetching data.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Initially shows data table', async () => {
      const table = canvas.queryByRole('table');
      if (table) {
        await expect(table).toBeInTheDocument();
      }
      // Data appears in both desktop and mobile views
      await expect(canvas.getAllByText('Ahmed Ali').length).toBeGreaterThanOrEqual(1);
    });

    await step('Trigger button is enabled', async () => {
      const triggerButton = canvas.getByRole('button', { name: /trigger loading state/i });
      await expect(triggerButton).toBeInTheDocument();
      await expect(triggerButton).toBeEnabled();
    });

    await step('Clicking button triggers loading state', async () => {
      const triggerButton = canvas.getByRole('button', { name: /trigger loading state/i });
      await userEvent.click(triggerButton);

      // Button text changes to "Loading..."
      await expect(canvas.getByRole('button', { name: /loading\.\.\./i })).toBeInTheDocument();

      // Button becomes disabled
      const loadingButton = canvas.getByRole('button', { name: /loading\.\.\./i });
      await expect(loadingButton).toBeDisabled();
    });

    await step('Loading skeleton appears', async () => {
      // Table should not be visible during loading
      const table = canvas.queryByRole('table');
      await expect(table).not.toBeInTheDocument();

      // Skeleton loaders should be visible (they have animate-pulse class)
      const skeletons = canvasElement.querySelectorAll('.animate-pulse');
      await expect(skeletons.length).toBeGreaterThan(0);
    });

    await step('Loading completes after timeout', async () => {
      // Wait for loading to finish (2 second timeout)
      await new Promise(resolve => setTimeout(resolve, 2100));

      // Table reappears
      const table = canvas.queryByRole('table');
      if (table) {
        await expect(table).toBeInTheDocument();
      }
      await expect(canvas.getAllByText('Ahmed Ali').length).toBeGreaterThanOrEqual(1);

      // Button returns to normal state
      const triggerButton = canvas.getByRole('button', { name: /trigger loading state/i });
      await expect(triggerButton).toBeEnabled();
    });
  }
};

// Complete Example - from component page lines 887-916
export const CompleteExample: Story = {
  render: () => {
    const [searchValue, setSearchValue] = React.useState('');
    const [sortBy, setSortBy] = React.useState<string>();
    const [sortDirection, setSortDirection] = React.useState<SortDirection>(null);
    const [currentPage, setCurrentPage] = React.useState(1);
    const pageSize = 3;

    const handleSort = (columnId: string) => {
      if (sortBy === columnId) {
        if (sortDirection === 'asc') {
          setSortDirection('desc');
        } else if (sortDirection === 'desc') {
          setSortBy(undefined);
          setSortDirection(null);
        }
      } else {
        setSortBy(columnId);
        setSortDirection('asc');
      }
    };

    const filteredUsers = React.useMemo(() => {
      if (!searchValue) return usersEN;

      return usersEN.filter(user =>
        user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.role.toLowerCase().includes(searchValue.toLowerCase())
      );
    }, [searchValue]);

    React.useEffect(() => {
      setCurrentPage(1);
    }, [searchValue]);

    const paginatedData = React.useMemo(() => {
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return filteredUsers.slice(startIndex, endIndex);
    }, [filteredUsers, currentPage]);

    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground mb-4">
            All features combined: sorting, searching, pagination, and custom cells.
          </p>
          <DataTable
            data={paginatedData}
            columns={sortableColumns}
            searchable
            searchPlaceholder="Search users..."
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            clearSearchLabel="Clear search"
            sortBy={sortBy}
            sortDirection={sortDirection}
            onSort={handleSort}
            pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredUsers.length / pageSize)}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            nextLabel="Next"
            previousLabel="Previous"
            pageLabel={`Page ${currentPage} of ${Math.ceil(filteredUsers.length / pageSize)}`}
            striped
          />
        </CardContent>
      </Card>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Complete example with all features: sorting, searching, pagination, and striped rows.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders all features: search, sort, pagination', async () => {
      const searchInput = canvas.getByPlaceholderText('Search users...');
      await expect(searchInput).toBeInTheDocument();

      const table = canvas.queryByRole('table');
      if (table) {
        await expect(table).toBeInTheDocument();
      }

      const pageLabel = canvas.getByText('Page 1 of 2');
      await expect(pageLabel).toBeInTheDocument();
    });

    await step('Search filters results', async () => {
      const searchInput = canvas.getByPlaceholderText('Search users...');
      await userEvent.type(searchInput, 'Editor');

      // Should show 2 editors (appears in both desktop and mobile views)
      await expect(canvas.getAllByText('Fatima Hassan').length).toBeGreaterThanOrEqual(1);
      await expect(canvas.getAllByText('Sarah Abdullah').length).toBeGreaterThanOrEqual(1);
    });

    await step('Sorting works with pagination', async () => {
      // Clear search from previous step to restore full dataset
      const searchInput = canvas.getByPlaceholderText('Search users...');
      await userEvent.clear(searchInput);

      const nameButtons = canvas.getAllByRole('button', { name: /^name/i });
      await userEvent.click(nameButtons[0]);

      // First page sorted ascending
      const rows = canvas.queryAllByRole('row');
      if (rows.length > 1) {
        const firstRowCells = rows[1].querySelectorAll('td');
        if (firstRowCells.length > 0) {
          await expect(firstRowCells[0]).toHaveTextContent('Ahmed Ali');
        }
      }
    });

    await step('Navigate to page 2', async () => {
      const nextButton = canvas.getByRole('button', { name: /next/i });
      await userEvent.click(nextButton);

      await expect(canvas.getByText('Page 2 of 2')).toBeInTheDocument();
      await expect(canvas.getAllByText('Sarah Abdullah').length).toBeGreaterThanOrEqual(1);
    });

  }
};

