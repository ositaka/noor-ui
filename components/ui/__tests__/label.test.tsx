import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Label } from '../label';

describe('Label', () => {
  it('renders without crashing', () => {
    render(<Label>Username</Label>);
    expect(screen.getByText('Username')).toBeInTheDocument();
  });

  it('renders as a label element', () => {
    render(<Label data-testid="label">Test</Label>);
    expect(screen.getByTestId('label').tagName).toBe('LABEL');
  });

  it('associates with input via htmlFor', () => {
    render(
      <>
        <Label htmlFor="email">Email</Label>
        <input id="email" type="email" />
      </>
    );
    const label = screen.getByText('Email');
    expect(label).toHaveAttribute('for', 'email');
  });

  it('clicking label focuses associated input', async () => {
    const user = userEvent.setup();
    render(
      <>
        <Label htmlFor="name">Name</Label>
        <input id="name" />
      </>
    );
    await user.click(screen.getByText('Name'));
    expect(screen.getByRole('textbox')).toHaveFocus();
  });

  it('merges custom className', () => {
    render(<Label className="custom-class">Test</Label>);
    expect(screen.getByText('Test')).toHaveClass('custom-class');
  });

  it('renders in RTL context', () => {
    render(
      <div dir="rtl">
        <Label>اسم المستخدم</Label>
      </div>
    );
    expect(screen.getByText('اسم المستخدم')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<Label ref={ref}>Test</Label>);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLLabelElement));
  });
});
