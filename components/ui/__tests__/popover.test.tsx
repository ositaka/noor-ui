import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Popover, PopoverTrigger, PopoverContent } from '../popover';

describe('Popover', () => {
  it('renders trigger', () => {
    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>Popover content</PopoverContent>
      </Popover>
    );
    expect(screen.getByText('Open Popover')).toBeInTheDocument();
  });

  it('opens on trigger click', async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Content here</PopoverContent>
      </Popover>
    );
    await user.click(screen.getByText('Open'));
    expect(screen.getByText('Content here')).toBeInTheDocument();
  });

  it('closes on escape key', async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    );
    await user.click(screen.getByText('Open'));
    expect(screen.getByText('Content')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('renders controlled open state', () => {
    render(
      <Popover open>
        <PopoverTrigger>Trigger</PopoverTrigger>
        <PopoverContent>Always open</PopoverContent>
      </Popover>
    );
    expect(screen.getByText('Always open')).toBeInTheDocument();
  });

  it('merges custom className on content', async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent className="custom-popover" data-testid="content">
          Content
        </PopoverContent>
      </Popover>
    );
    await user.click(screen.getByText('Open'));
    expect(screen.getByTestId('content')).toHaveClass('custom-popover');
  });

  it('renders in RTL context', async () => {
    const user = userEvent.setup();
    render(
      <div dir="rtl">
        <Popover>
          <PopoverTrigger>افتح</PopoverTrigger>
          <PopoverContent>محتوى</PopoverContent>
        </Popover>
      </div>
    );
    await user.click(screen.getByText('افتح'));
    expect(screen.getByText('محتوى')).toBeInTheDocument();
  });
});
