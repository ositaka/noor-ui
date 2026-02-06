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
  tags: ['!autodocs'],
  argTypes: {
    // No specific props to control - component is structural
  }
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground (hidden from stories list to avoid ID conflicts)
export const Default: Story = {
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders correctly with navigation elements', async () => {
      const nav = canvas.getByRole('navigation', { name: 'pagination' });
      await expect(nav).toBeInTheDocument();
      await expect(nav).toBeVisible();
    });

    await step('Displays Previous and Next buttons', async () => {
      const prevButton = canvas.getByRole('link', { name: /previous/i });
      const nextButton = canvas.getByRole('link', { name: /next/i });

      await expect(prevButton).toBeInTheDocument();
      await expect(nextButton).toBeInTheDocument();
      await expect(prevButton).toBeVisible();
      await expect(nextButton).toBeVisible();
    });

    await step('Displays page number links', async () => {
      const page1 = canvas.getByRole('link', { name: '1' });
      const page2 = canvas.getByRole('link', { name: '2' });
      const page3 = canvas.getByRole('link', { name: '3' });

      await expect(page1).toBeInTheDocument();
      await expect(page2).toBeInTheDocument();
      await expect(page3).toBeInTheDocument();
    });

    await step('Indicates active page with aria-current', async () => {
      const activePage = canvas.getByRole('link', { name: '2' });
      await expect(activePage).toHaveAttribute('aria-current', 'page');
    });

    await step('Keyboard navigation works', async () => {
      // Tab to first interactive element
      await userEvent.tab();
      const prevButton = canvas.getByRole('link', { name: /previous/i });
      await expect(prevButton).toHaveFocus();

      // Tab through page numbers
      await userEvent.tab();
      const page1 = canvas.getByRole('link', { name: '1' });
      await expect(page1).toHaveFocus();

      // Continue tabbing
      await userEvent.tab();
      const page2 = canvas.getByRole('link', { name: '2' });
      await expect(page2).toHaveFocus();

      await userEvent.tab();
      const page3 = canvas.getByRole('link', { name: '3' });
      await expect(page3).toHaveFocus();

      await userEvent.tab();
      const nextButton = canvas.getByRole('link', { name: /next/i });
      await expect(nextButton).toHaveFocus();
    });

    await step('Links are clickable', async () => {
      const page1 = canvas.getByRole('link', { name: '1' });
      await userEvent.click(page1);
      // Link navigates (no assertion needed, just verify clickable)
    });
  }
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
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
  globals: {
    direction: 'ltr',
    locale: 'en'
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
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

// RTL Example - Basic
export const RTLExample: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#">السابق</PaginationPrevious>
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
          <PaginationNext href="#">التالي</PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Basic pagination with Arabic text in RTL mode. Chevrons automatically flip direction.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders in RTL context', async () => {
      const nav = canvas.getByRole('navigation', { name: 'pagination' });
      await expect(nav).toBeInTheDocument();
    });

    await step('Displays Arabic text correctly', async () => {
      await expect(canvas.getByText('السابق')).toBeInTheDocument();
      await expect(canvas.getByText('التالي')).toBeInTheDocument();
    });

    await step('Navigation works in RTL', async () => {
      const page1 = canvas.getByRole('link', { name: '1' });
      await userEvent.click(page1);
      await expect(page1).toBeVisible();
    });
  }
};

// RTL With Ellipsis
export const RTLWithEllipsis: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#">السابق</PaginationPrevious>
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
          <PaginationNext href="#">التالي</PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Pagination with ellipsis in RTL mode. Layout flows naturally right-to-left.'
      }
    }
  }
};

// RTL Controlled
export const RTLControlled: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState(2);

    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">الصفحة الحالية: {currentPage}</p>
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
                السابق
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
                التالي
              </PaginationNext>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
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
        story: 'Controlled pagination in RTL with Arabic text. State management works the same in both directions.'
      }
    }
  }
};

// RTL Few Pages
export const RTLFewPages: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#">السابق</PaginationPrevious>
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
          <PaginationNext href="#">التالي</PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Pagination with 5 pages in RTL mode. Page numbers and navigation flow right-to-left.'
      }
    }
  }
};
