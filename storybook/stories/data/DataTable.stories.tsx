import type { Meta, StoryObj } from '@storybook/react';
import { DataTable, type ColumnDef, type SortDirection } from '../../../components/ui/data-table';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import * as React from 'react';

/**
 * DataTable Component Stories
 *
 * All examples are taken from /app/(docs)/components/data-table/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: DataTable is a powerful component with sorting, filtering, pagination, and mobile responsiveness.
 * Features include: internal/external sorting, search, pagination, loading states, custom cells, and full RTL support.
 */

const meta = {
  title: 'Data Display/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded'
  },
  tags: ['!autodocs'],
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  render: (args) => (
    <div className="w-full">
      <DataTable {...args} />
    </div>
  ),
  parameters: {
    docs: {
      story: {
        inline: false
      }
    }
  }
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Basic data table with three columns showing user information.'
      }
    }
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Simple sorting with enableSorting prop. The component manages sort state internally.'
      }
    }
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'External state management for advanced use cases (e.g., URL sync, API integration).'
      }
    }
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
          />
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
        story: 'Data table with built-in search functionality and clear button.'
      }
    }
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Data table with integrated pagination controls.'
      }
    }
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Custom cell rendering with badges, styled text, and action buttons.'
      }
    }
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Data table with skeleton loading animation while fetching data.'
      }
    }
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Complete example with all features: sorting, searching, pagination, and striped rows.'
      }
    }
  }
};

// RTL Example - Basic
export const RTLExample: Story = {
  render: () => {
    const columnsAR: ColumnDef<User>[] = [
      { id: 'name', header: 'الاسم', accessorKey: 'name' },
      { id: 'email', header: 'البريد الإلكتروني', accessorKey: 'email' },
      { id: 'role', header: 'الدور', accessorKey: 'role' },
    ];

    return (
      <div className="w-full">
        <DataTable
          data={usersAR}
          columns={columnsAR}
          hoverable
        />
      </div>
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
        story: 'Basic data table in RTL mode with Arabic text. Text alignment uses text-start for proper display.'
      }
    }
  }
};

// RTL Searchable
export const RTLSearchable: Story = {
  render: () => {
    const [searchValue, setSearchValue] = React.useState('');

    const columnsAR: ColumnDef<User>[] = [
      { id: 'name', header: 'الاسم', accessorKey: 'name' },
      { id: 'email', header: 'البريد الإلكتروني', accessorKey: 'email' },
      { id: 'role', header: 'الدور', accessorKey: 'role' },
    ];

    const filteredUsers = React.useMemo(() => {
      if (!searchValue) return usersAR;

      return usersAR.filter(user =>
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
            columns={columnsAR}
            searchable
            searchPlaceholder="بحث بالاسم أو البريد الإلكتروني أو الدور..."
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            emptyMessage="لم يتم العثور على مستخدمين"
          />
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
        story: 'Searchable data table in RTL with Arabic placeholders. Search icon and clear button adapt to RTL.'
      }
    }
  }
};

// RTL Complete Example
export const RTLCompleteExample: Story = {
  render: () => {
    const [searchValue, setSearchValue] = React.useState('');
    const [currentPage, setCurrentPage] = React.useState(1);
    const pageSize = 3;

    const sortableColumnsAR: ColumnDef<User>[] = [
      { id: 'name', header: 'الاسم', accessorKey: 'name', sortable: true },
      { id: 'email', header: 'البريد الإلكتروني', accessorKey: 'email', sortable: true },
      { id: 'role', header: 'الدور', accessorKey: 'role', sortable: true },
      { id: 'joinDate', header: 'تاريخ الانضمام', accessorKey: 'joinDate', sortable: true },
    ];

    const filteredUsers = React.useMemo(() => {
      if (!searchValue) return usersAR;

      return usersAR.filter(user =>
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
            جميع الميزات مجتمعة: الفرز والبحث والترقيم والخلايا المخصصة.
          </p>
          <DataTable
            data={paginatedData}
            columns={sortableColumnsAR}
            searchable
            searchPlaceholder="البحث عن المستخدمين..."
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            enableSorting
            defaultSortBy="name"
            pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredUsers.length / pageSize)}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            nextLabel="التالي"
            previousLabel="السابق"
            pageLabel={`صفحة ${currentPage} من ${Math.ceil(filteredUsers.length / pageSize)}`}
            striped
          />
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
        story: 'Complete example in RTL with all features. Sort indicators, pagination arrows, and search all work correctly.'
      }
    }
  }
};
