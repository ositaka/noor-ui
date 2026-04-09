import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../accordion';

const TestAccordion = ({ type = 'single' as const }) => (
  <Accordion type={type} collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger>Section 1</AccordionTrigger>
      <AccordionContent>Content 1</AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>Section 2</AccordionTrigger>
      <AccordionContent>Content 2</AccordionContent>
    </AccordionItem>
  </Accordion>
);

describe('Accordion', () => {
  it('renders without crashing', () => {
    render(<TestAccordion />);
    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();
  });

  it('expands item on click', async () => {
    const user = userEvent.setup();
    render(<TestAccordion />);
    await user.click(screen.getByText('Section 1'));
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('collapses item on second click (collapsible)', async () => {
    const user = userEvent.setup();
    render(<TestAccordion />);
    await user.click(screen.getByText('Section 1'));
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    await user.click(screen.getByText('Section 1'));
    // Radix removes content from DOM when collapsed
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  });

  it('only one item open in single mode', async () => {
    const user = userEvent.setup();
    render(<TestAccordion type="single" />);
    await user.click(screen.getByText('Section 1'));
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    await user.click(screen.getByText('Section 2'));
    // Section 1 content removed, Section 2 content shown
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('multiple items open in multiple mode', async () => {
    const user = userEvent.setup();
    render(
      <Accordion type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Section 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    await user.click(screen.getByText('Section 1'));
    await user.click(screen.getByText('Section 2'));
    expect(screen.getByText('Content 1').closest('[data-state]')).toHaveAttribute('data-state', 'open');
    expect(screen.getByText('Content 2').closest('[data-state]')).toHaveAttribute('data-state', 'open');
  });

  it('renders triggers as buttons', () => {
    render(<TestAccordion />);
    const triggers = screen.getAllByRole('button');
    expect(triggers.length).toBeGreaterThanOrEqual(2);
  });

  it('merges custom className on AccordionItem', () => {
    render(
      <Accordion type="single">
        <AccordionItem value="a" className="custom-item" data-testid="item">
          <AccordionTrigger>Trigger</AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    expect(screen.getByTestId('item')).toHaveClass('custom-item');
  });

  it('renders in RTL context', () => {
    render(
      <div dir="rtl">
        <TestAccordion />
      </div>
    );
    expect(screen.getByText('Section 1')).toBeInTheDocument();
  });
});
