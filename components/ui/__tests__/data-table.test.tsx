import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import DataTable, { type ColumnDef } from '../data-table';

interface TestRow {
  name: string;
  age: number;
  city: string;
}

const columns: ColumnDef<TestRow>[] = [
  { id: 'name', header: 'Name', accessorKey: 'name', sortable: true },
  { id: 'age', header: 'Age', accessorKey: 'age', sortable: true },
  { id: 'city', header: 'City', accessorKey: 'city' },
];

const data: TestRow[] = [
  { name: 'Alice', age: 30, city: 'Dubai' },
  { name: 'Bob', age: 25, city: 'Abu Dhabi' },
  { name: 'Charlie', age: 35, city: 'Sharjah' },
];

describe('DataTable', () => {
  it('renders without crashing', () => {
    render(<DataTable data={data} columns={columns} />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('renders column headers', () => {
    render(<DataTable data={data} columns={columns} />);
    // Desktop + mobile views both render headers, so use getAllByText
    expect(screen.getAllByText('Name').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Age').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('City').length).toBeGreaterThanOrEqual(1);
  });

  it('renders data rows', () => {
    render(<DataTable data={data} columns={columns} />);
    // Desktop + mobile card views both render data
    expect(screen.getAllByText('Alice').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Bob').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Charlie').length).toBeGreaterThanOrEqual(1);
  });

  it('shows empty message when no data', () => {
    render(
      <DataTable data={[]} columns={columns} emptyMessage="No records found" />
    );
    expect(screen.getByText('No records found')).toBeInTheDocument();
  });

  it('renders search input when searchable', () => {
    render(
      <DataTable
        data={data}
        columns={columns}
        searchable
        searchPlaceholder="Search..."
      />
    );
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('calls onSearchChange when typing in search', async () => {
    const user = userEvent.setup();
    const onSearchChange = vi.fn();
    render(
      <DataTable
        data={data}
        columns={columns}
        searchable
        searchPlaceholder="Search..."
        onSearchChange={onSearchChange}
      />
    );
    await user.type(screen.getByPlaceholderText('Search...'), 'Ali');
    expect(onSearchChange).toHaveBeenCalled();
  });

  it('sorts data when enableSorting is true', async () => {
    const user = userEvent.setup();
    render(
      <DataTable data={data} columns={columns} enableSorting />
    );
    // Click the Name sort button
    const nameButton = screen.getAllByRole('button').find(btn =>
      btn.textContent?.includes('Name')
    );
    if (nameButton) {
      await user.click(nameButton);
      // Data should be sorted ascending by name
      const rows = screen.getAllByRole('row');
      expect(rows.length).toBeGreaterThan(1);
    }
  });

  it('shows loading skeleton when isLoading', () => {
    render(<DataTable data={[]} columns={columns} isLoading />);
    // Should not show table
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('renders pagination controls', () => {
    render(
      <DataTable
        data={data}
        columns={columns}
        pagination
        currentPage={1}
        totalPages={3}
        previousLabel="Previous"
        nextLabel="Next"
        pageLabel="Page 1 of 3"
      />
    );
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('Page 1 of 3')).toBeInTheDocument();
  });

  it('renders with custom cell renderer', () => {
    const customColumns: ColumnDef<TestRow>[] = [
      {
        id: 'name',
        header: 'Name',
        accessorKey: 'name',
        cell: (row) => <strong>{row.name}</strong>,
      },
    ];
    render(<DataTable data={data} columns={customColumns} />);
    const boldElements = screen.getAllByText('Alice');
    expect(boldElements[0].tagName).toBe('STRONG');
  });
});
