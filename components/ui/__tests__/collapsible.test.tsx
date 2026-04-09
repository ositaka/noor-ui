import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '../collapsible';

describe('Collapsible', () => {
  it('renders without crashing', () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Hidden content</CollapsibleContent>
      </Collapsible>
    );
    expect(screen.getByText('Toggle')).toBeInTheDocument();
  });

  it('content is hidden by default', () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Hidden content</CollapsibleContent>
      </Collapsible>
    );
    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
  });

  it('shows content on trigger click', async () => {
    const user = userEvent.setup();
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Visible content</CollapsibleContent>
      </Collapsible>
    );
    await user.click(screen.getByText('Toggle'));
    expect(screen.getByText('Visible content')).toBeInTheDocument();
  });

  it('hides content on second click', async () => {
    const user = userEvent.setup();
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );
    await user.click(screen.getByText('Toggle'));
    expect(screen.getByText('Content')).toBeInTheDocument();
    await user.click(screen.getByText('Toggle'));
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('renders with defaultOpen', () => {
    render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('supports controlled open state', () => {
    const { rerender } = render(
      <Collapsible open={false}>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
    rerender(
      <Collapsible open>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('calls onOpenChange', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Collapsible onOpenChange={onOpenChange}>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );
    await user.click(screen.getByText('Toggle'));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it('renders in RTL context', async () => {
    const user = userEvent.setup();
    render(
      <div dir="rtl">
        <Collapsible>
          <CollapsibleTrigger>تبديل</CollapsibleTrigger>
          <CollapsibleContent>محتوى</CollapsibleContent>
        </Collapsible>
      </div>
    );
    await user.click(screen.getByText('تبديل'));
    expect(screen.getByText('محتوى')).toBeInTheDocument();
  });
});
