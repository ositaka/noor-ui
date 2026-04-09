import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '../tooltip';

const TestTooltip = ({ content = 'Tooltip text' }: { content?: string }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>Hover me</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

describe('Tooltip', () => {
  it('renders trigger', () => {
    render(<TestTooltip />);
    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  it('does not show content initially', () => {
    render(<TestTooltip />);
    expect(screen.queryByText('Tooltip text')).not.toBeInTheDocument();
  });

  it('shows content on hover', async () => {
    const user = userEvent.setup();
    render(<TestTooltip />);
    await user.hover(screen.getByText('Hover me'));
    // Radix Tooltip may render content in both portal and aria-describedby
    const elements = await screen.findAllByText('Tooltip text');
    expect(elements.length).toBeGreaterThanOrEqual(1);
  });

  it('merges custom className on content', async () => {
    const user = userEvent.setup();
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover</TooltipTrigger>
          <TooltipContent className="custom-tip" data-testid="tip">Tip</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
    await user.hover(screen.getByText('Hover'));
    const tip = await screen.findByTestId('tip');
    expect(tip).toHaveClass('custom-tip');
  });

  it('renders in RTL context', async () => {
    const user = userEvent.setup();
    render(
      <div dir="rtl">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>مرر هنا</TooltipTrigger>
            <TooltipContent>نص التلميح</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
    await user.hover(screen.getByText('مرر هنا'));
    const elements = await screen.findAllByText('نص التلميح');
    expect(elements.length).toBeGreaterThanOrEqual(1);
  });
});
