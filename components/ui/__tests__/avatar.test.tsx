import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Avatar, AvatarImage, AvatarFallback } from '../avatar';

describe('Avatar', () => {
  it('renders without crashing', () => {
    render(
      <Avatar data-testid="avatar">
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
  });

  it('renders fallback text', () => {
    render(
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByText('AB')).toBeInTheDocument();
  });

  it('shows fallback when image is not loaded', () => {
    // In jsdom, image onLoad never fires so Radix shows the fallback.
    render(
      <Avatar>
        <AvatarImage src="/avatar.jpg" alt="User avatar" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('merges custom className on Avatar', () => {
    render(
      <Avatar data-testid="avatar" className="h-20 w-20">
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByTestId('avatar')).toHaveClass('h-20', 'w-20');
  });

  it('merges custom className on AvatarFallback', () => {
    render(
      <Avatar>
        <AvatarFallback data-testid="fallback" className="bg-red-500">JD</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByTestId('fallback')).toHaveClass('bg-red-500');
  });

  it('renders AvatarImage and AvatarFallback together without error', () => {
    // AvatarImage won't visually render in jsdom (no image loading),
    // but the component tree should mount without errors.
    render(
      <Avatar data-testid="avatar">
        <AvatarImage src="/avatar.jpg" alt="User" className="grayscale" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders in RTL context', () => {
    render(
      <div dir="rtl">
        <Avatar data-testid="avatar">
          <AvatarFallback>خم</AvatarFallback>
        </Avatar>
      </div>
    );
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
    expect(screen.getByText('خم')).toBeInTheDocument();
  });

  it('forwards ref on Avatar', () => {
    const ref = vi.fn();
    render(
      <Avatar ref={ref}>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLSpanElement));
  });
});
