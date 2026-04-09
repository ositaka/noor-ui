import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '../pagination';

describe('Pagination', () => {
  it('renders without crashing', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
    expect(screen.getByRole('navigation', { name: 'pagination' })).toBeInTheDocument();
  });

  it('renders page links', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
          <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
          <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
        </PaginationContent>
      </Pagination>
    );
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('marks active page', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
          <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
          <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
        </PaginationContent>
      </Pagination>
    );
    const activeLink = screen.getByText('2').closest('a');
    expect(activeLink).toHaveAttribute('aria-current', 'page');
  });

  it('renders previous and next buttons', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem><PaginationPrevious href="#">Previous</PaginationPrevious></PaginationItem>
          <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
          <PaginationItem><PaginationNext href="#">Next</PaginationNext></PaginationItem>
        </PaginationContent>
      </Pagination>
    );
    expect(screen.getByLabelText('Go to previous page')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to next page')).toBeInTheDocument();
  });

  it('renders ellipsis', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
          <PaginationItem><PaginationEllipsis /></PaginationItem>
          <PaginationItem><PaginationLink href="#">10</PaginationLink></PaginationItem>
        </PaginationContent>
      </Pagination>
    );
    expect(screen.getByText('More pages')).toBeInTheDocument();
  });

  it('merges custom className', () => {
    render(
      <Pagination className="custom-nav" data-testid="pag">
        <PaginationContent>
          <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
        </PaginationContent>
      </Pagination>
    );
    expect(screen.getByTestId('pag')).toHaveClass('custom-nav');
  });

  it('renders in RTL context', () => {
    render(
      <div dir="rtl">
        <Pagination>
          <PaginationContent>
            <PaginationItem><PaginationPrevious href="#">السابق</PaginationPrevious></PaginationItem>
            <PaginationItem><PaginationLink href="#">١</PaginationLink></PaginationItem>
            <PaginationItem><PaginationNext href="#">التالي</PaginationNext></PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
    expect(screen.getByText('السابق')).toBeInTheDocument();
    expect(screen.getByText('التالي')).toBeInTheDocument();
  });

  it('arrow icons have rtl:rotate-180 class for RTL flipping', () => {
    const { container } = render(
      <Pagination>
        <PaginationContent>
          <PaginationItem><PaginationPrevious href="#">Prev</PaginationPrevious></PaginationItem>
          <PaginationItem><PaginationNext href="#">Next</PaginationNext></PaginationItem>
        </PaginationContent>
      </Pagination>
    );
    const svgs = container.querySelectorAll('svg');
    svgs.forEach(svg => {
      expect(svg).toHaveClass('rtl:rotate-180');
    });
  });

  it('non-active page does not have aria-current', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
        </PaginationContent>
      </Pagination>
    );
    expect(screen.getByText('1').closest('a')).not.toHaveAttribute('aria-current');
  });

  it('uses logical padding (ps/pe) for RTL-safe spacing', () => {
    const { container } = render(
      <Pagination>
        <PaginationContent>
          <PaginationItem><PaginationPrevious href="#">Prev</PaginationPrevious></PaginationItem>
        </PaginationContent>
      </Pagination>
    );
    const prevLink = screen.getByLabelText('Go to previous page');
    expect(prevLink).toHaveClass('ps-2.5');
  });
});
