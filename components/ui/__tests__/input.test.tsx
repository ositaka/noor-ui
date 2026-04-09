import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Input } from '../input';

describe('Input', () => {
  it('renders without crashing', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('renders different input types', () => {
    const { unmount } = render(<Input type="email" placeholder="email" />);
    expect(screen.getByPlaceholderText('email')).toHaveAttribute('type', 'email');
    unmount();

    const { unmount: unmount2 } = render(<Input type="password" placeholder="pw" />);
    expect(screen.getByPlaceholderText('pw')).toHaveAttribute('type', 'password');
    unmount2();

    render(<Input type="number" placeholder="num" />);
    expect(screen.getByPlaceholderText('num')).toHaveAttribute('type', 'number');
  });

  it('handles value changes', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input onChange={onChange} />);
    await user.type(screen.getByRole('textbox'), 'hello');
    expect(onChange).toHaveBeenCalledTimes(5);
  });

  it('renders as disabled', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('does not accept input when disabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input disabled onChange={onChange} />);
    await user.type(screen.getByRole('textbox'), 'hello');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('merges custom className', () => {
    render(<Input className="custom-class" />);
    expect(screen.getByRole('textbox')).toHaveClass('custom-class');
  });

  it('uses provided id', () => {
    render(<Input id="my-input" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'my-input');
  });

  it('renders in RTL context', () => {
    render(
      <div dir="rtl">
        <Input placeholder="أدخل النص" />
      </div>
    );
    expect(screen.getByPlaceholderText('أدخل النص')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<Input ref={ref} />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
  });

  it('supports controlled value', () => {
    const { rerender } = render(<Input value="initial" readOnly />);
    expect(screen.getByRole('textbox')).toHaveValue('initial');
    rerender(<Input value="updated" readOnly />);
    expect(screen.getByRole('textbox')).toHaveValue('updated');
  });

  it('renders with empty string value', () => {
    render(<Input value="" readOnly />);
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('applies focus ring styles on focus-visible', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toHaveClass('focus-visible:ring-1');
  });

  it('applies disabled cursor and opacity styles', () => {
    render(<Input disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50');
  });

  it('renders as native input element', () => {
    render(<Input />);
    expect(screen.getByRole('textbox').tagName).toBe('INPUT');
  });

  it('supports aria-label for accessibility', () => {
    render(<Input aria-label="Search" />);
    expect(screen.getByLabelText('Search')).toBeInTheDocument();
  });

  it('supports aria-invalid for form validation', () => {
    render(<Input aria-invalid="true" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('supports aria-describedby for error messages', () => {
    render(
      <>
        <Input aria-describedby="error-msg" />
        <span id="error-msg">This field is required</span>
      </>
    );
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby', 'error-msg');
  });
});
