import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../../../components/ui/pagination';
import { Card, CardContent } from '../../../components/ui/card';
import * as React from 'react';

/**
 * Pagination Component Stories
 *
 * All examples are taken from /app/(docs)/components/pagination/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: Pagination provides navigation through pages of content.
 * Fully responsive with automatic RTL support for navigation arrows.
 */

const meta = {
  title: 'Navigation/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    // No specific props to control - component is structural
  }
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground (hidden from stories list to avoid ID conflicts)
export const Default: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#">Previous</PaginationPrevious>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#">Next</PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  parameters: {
    docs: {
      story: {
        inline: false
      }
    }
  },
};

// Basic Pagination - from component page lines 196-216
export const BasicPagination: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#">Previous</PaginationPrevious>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#">Next</PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Basic pagination with Previous/Next buttons and page numbers. Page 2 is currently active.'
      }
    }
  }
};

// With Ellipsis - from component page lines 244-276
export const WithEllipsis: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#">Previous</PaginationPrevious>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">5</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            6
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">7</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#">Next</PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Pagination with ellipsis (...) for indicating hidden pages. Shows pages 1, 5-7, and 10 out of 10 total.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders pagination with ellipsis', async () => {
      const nav = canvas.getByRole('navigation', { name: 'pagination' });
      await expect(nav).toBeInTheDocument();
    });

    await step('Displays ellipsis elements', async () => {
      const ellipsisElements = canvas.getAllByText('More pages');
      await expect(ellipsisElements).toHaveLength(2);
    });

    await step('Displays selected page numbers', async () => {
      await expect(canvas.getByRole('link', { name: '1' })).toBeInTheDocument();
      await expect(canvas.getByRole('link', { name: '5' })).toBeInTheDocument();
      await expect(canvas.getByRole('link', { name: '6' })).toBeInTheDocument();
      await expect(canvas.getByRole('link', { name: '7' })).toBeInTheDocument();
      await expect(canvas.getByRole('link', { name: '10' })).toBeInTheDocument();
    });

    await step('Active page is indicated', async () => {
      const activePage = canvas.getByRole('link', { name: '6' });
      await expect(activePage).toHaveAttribute('aria-current', 'page');
    });
  }
};

// Controlled - from component page lines 286-346
export const Controlled: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState(2);

    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">Current page: {currentPage}</p>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
              >
                Previous
              </PaginationPrevious>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive={currentPage === 1}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(1);
                }}
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive={currentPage === 2}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(2);
                }}
              >
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive={currentPage === 3}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(3);
                }}
              >
                3
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < 3) setCurrentPage(currentPage + 1);
                }}
              >
                Next
              </PaginationNext>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Controlled pagination with state management. Current page is displayed above and updates on click.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Initial state shows page 2 as active', async () => {
      await expect(canvas.getByText('Current page: 2')).toBeInTheDocument();
      const page2 = canvas.getByRole('link', { name: '2' });
      await expect(page2).toHaveAttribute('aria-current', 'page');
    });

    await step('Clicking page 1 updates state', async () => {
      const page1 = canvas.getByRole('link', { name: '1' });
      await userEvent.click(page1);
      await expect(canvas.getByText('Current page: 1')).toBeInTheDocument();
      await expect(page1).toHaveAttribute('aria-current', 'page');
    });

    await step('Next button increments page', async () => {
      const nextButton = canvas.getByRole('link', { name: /next/i });
      await userEvent.click(nextButton);
      await expect(canvas.getByText('Current page: 2')).toBeInTheDocument();

      await userEvent.click(nextButton);
      await expect(canvas.getByText('Current page: 3')).toBeInTheDocument();
    });

    await step('Previous button decrements page', async () => {
      const prevButton = canvas.getByRole('link', { name: /previous/i });
      await userEvent.click(prevButton);
      await expect(canvas.getByText('Current page: 2')).toBeInTheDocument();

      await userEvent.click(prevButton);
      await expect(canvas.getByText('Current page: 1')).toBeInTheDocument();
    });

    await step('Clicking page 3 updates state', async () => {
      const page3 = canvas.getByRole('link', { name: '3' });
      await userEvent.click(page3);
      await expect(canvas.getByText('Current page: 3')).toBeInTheDocument();
      await expect(page3).toHaveAttribute('aria-current', 'page');
    });
  }
};

// Few Pages
export const FewPages: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#">Previous</PaginationPrevious>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">4</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">5</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#">Next</PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Pagination with 5 pages shown. No ellipsis needed for smaller page counts.'
      }
    }
  }
};

// In Card
export const InCard: Story = {
  render: () => (
    <Card className="w-full max-w-2xl">
      <CardContent className="p-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Navigate Content</h3>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#">Previous</PaginationPrevious>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#">Next</PaginationNext>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardContent>
    </Card>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Pagination placed inside a card component.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders pagination inside card', async () => {
      await expect(canvas.getByText('Navigate Content')).toBeInTheDocument();
      const nav = canvas.getByRole('navigation', { name: 'pagination' });
      await expect(nav).toBeInTheDocument();
    });

    await step('Pagination is functional within card', async () => {
      const page1 = canvas.getByRole('link', { name: '1' });
      await userEvent.click(page1);
      await expect(page1).toBeVisible();
    });
  }
};

