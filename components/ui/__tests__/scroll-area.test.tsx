import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ScrollArea } from '../scroll-area';

describe('ScrollArea', () => {
  it('renders without crashing', () => {
    render(
      <ScrollArea data-testid="scroll-area">
        <div>Scrollable content</div>
      </ScrollArea>
    );
    expect(screen.getByTestId('scroll-area')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <ScrollArea>
        <p>First paragraph</p>
        <p>Second paragraph</p>
      </ScrollArea>
    );
    expect(screen.getByText('First paragraph')).toBeInTheDocument();
    expect(screen.getByText('Second paragraph')).toBeInTheDocument();
  });

  it('merges custom className', () => {
    render(
      <ScrollArea className="h-72 custom-scroll" data-testid="scroll">
        <div>Content</div>
      </ScrollArea>
    );
    expect(screen.getByTestId('scroll')).toHaveClass('h-72', 'custom-scroll');
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(
      <ScrollArea ref={ref}>
        <div>Content</div>
      </ScrollArea>
    );
    expect(ref).toHaveBeenCalled();
  });

  it('renders in RTL context', () => {
    render(
      <div dir="rtl">
        <ScrollArea data-testid="scroll">
          <div>محتوى قابل للتمرير</div>
        </ScrollArea>
      </div>
    );
    expect(screen.getByTestId('scroll')).toBeInTheDocument();
    expect(screen.getByText('محتوى قابل للتمرير')).toBeInTheDocument();
  });
});
