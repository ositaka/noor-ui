import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from '../table';

describe('Table', () => {
  it('renders without crashing', () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('renders full table with all sub-components', () => {
    render(
      <Table>
        <TableCaption>A list of items</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Item 1</TableCell>
            <TableCell>100</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Item 2</TableCell>
            <TableCell>200</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell>300</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
    expect(screen.getByText('A list of items')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('renders column headers', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Col A</TableHead>
            <TableHead>Col B</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>A1</TableCell>
            <TableCell>B1</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(screen.getAllByRole('columnheader')).toHaveLength(2);
  });

  it('merges custom className on Table', () => {
    render(
      <Table className="custom-table">
        <TableBody>
          <TableRow><TableCell>Cell</TableCell></TableRow>
        </TableBody>
      </Table>
    );
    expect(screen.getByRole('table')).toHaveClass('custom-table');
  });

  it('forwards ref on Table', () => {
    const ref = vi.fn();
    render(
      <Table ref={ref}>
        <TableBody>
          <TableRow><TableCell>Cell</TableCell></TableRow>
        </TableBody>
      </Table>
    );
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLTableElement));
  });

  it('renders in RTL context', () => {
    render(
      <div dir="rtl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>الاسم</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>عنصر</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
    expect(screen.getByText('الاسم')).toBeInTheDocument();
    expect(screen.getByText('عنصر')).toBeInTheDocument();
  });
});
