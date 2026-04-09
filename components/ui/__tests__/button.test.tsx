import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '../button';

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('applies correct classes for each variant', () => {
    const variantClasses: Record<string, string> = {
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      destructive: 'bg-destructive',
      outline: 'border',
      ghost: 'hover:bg-accent',
      link: 'underline-offset-4',
    };
    for (const [variant, expectedClass] of Object.entries(variantClasses)) {
      const { unmount } = render(<Button variant={variant as any}>Test</Button>);
      expect(screen.getByRole('button')).toHaveClass(expectedClass);
      unmount();
    }
  });

  it('applies correct classes for each size', () => {
    const sizeClasses: Record<string, string> = {
      sm: 'h-8',
      md: 'h-9',
      lg: 'h-10',
      xl: 'h-11',
      icon: 'w-9',
    };
    for (const [size, expectedClass] of Object.entries(sizeClasses)) {
      const { unmount } = render(<Button size={size as any}>Test</Button>);
      expect(screen.getByRole('button')).toHaveClass(expectedClass);
      unmount();
    }
  });

  it('defaults to primary variant and md size', () => {
    render(<Button>Default</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('bg-primary');
    expect(btn).toHaveClass('h-9');
  });

  it('handles click events', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('does not fire click when disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>Click</Button>);
    await user.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('shows loading state', () => {
    render(<Button loading>Loading</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('does not fire click when loading', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button loading onClick={onClick}>Click</Button>);
    await user.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders spinner SVG when loading', () => {
    render(<Button loading>Loading</Button>);
    const button = screen.getByRole('button');
    expect(button.querySelector('svg')).toBeInTheDocument();
  });

  it('renders as child element with asChild', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    );
    expect(screen.getByRole('link', { name: 'Link Button' })).toBeInTheDocument();
  });

  it('does not use Slot when both asChild and loading are true', () => {
    render(
      <Button asChild loading>
        <a href="/test">Link</a>
      </Button>
    );
    // Should render as button (not a link) because loading overrides asChild
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('merges custom className', () => {
    render(<Button className="custom-class">Test</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('renders in RTL context', () => {
    render(
      <div dir="rtl">
        <Button>زر</Button>
      </div>
    );
    expect(screen.getByRole('button', { name: 'زر' })).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<Button ref={ref}>Test</Button>);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement));
  });

  it('passes through native button attributes', () => {
    render(<Button type="submit" name="submit-btn">Submit</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveAttribute('name', 'submit-btn');
  });

  it('has disabled opacity when disabled', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toHaveClass('disabled:opacity-50');
  });

  it('is keyboard accessible via Enter and Space', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Press</Button>);
    screen.getByRole('button').focus();
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledTimes(1);
    await user.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('loading spinner has aria-hidden', () => {
    render(<Button loading>Loading</Button>);
    const svg = screen.getByRole('button').querySelector('svg');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('loading spinner uses logical margin (ms/me) for RTL', () => {
    render(<Button loading>Loading</Button>);
    const svg = screen.getByRole('button').querySelector('svg');
    expect(svg).toHaveClass('-ms-1', 'me-2');
  });
});
