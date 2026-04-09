import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Textarea } from '../textarea';

describe('Textarea', () => {
  it('renders without crashing', () => {
    render(<Textarea />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    render(<Textarea placeholder="Enter message" />);
    expect(screen.getByPlaceholderText('Enter message')).toBeInTheDocument();
  });

  it('handles value changes', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Textarea onChange={onChange} />);
    await user.type(screen.getByRole('textbox'), 'hello');
    expect(onChange).toHaveBeenCalledTimes(5);
  });

  it('renders as disabled', () => {
    render(<Textarea disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('supports controlled value', () => {
    const { rerender } = render(<Textarea value="initial" readOnly />);
    expect(screen.getByRole('textbox')).toHaveValue('initial');
    rerender(<Textarea value="updated" readOnly />);
    expect(screen.getByRole('textbox')).toHaveValue('updated');
  });

  it('merges custom className', () => {
    render(<Textarea className="custom-class" />);
    expect(screen.getByRole('textbox')).toHaveClass('custom-class');
  });

  it('uses provided id', () => {
    render(<Textarea id="my-textarea" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'my-textarea');
  });

  it('renders in RTL context', () => {
    render(
      <div dir="rtl">
        <Textarea placeholder="أدخل الرسالة" />
      </div>
    );
    expect(screen.getByPlaceholderText('أدخل الرسالة')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<Textarea ref={ref} />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLTextAreaElement));
  });

  it('passes through native textarea attributes', () => {
    render(<Textarea rows={5} maxLength={100} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('rows', '5');
    expect(textarea).toHaveAttribute('maxlength', '100');
  });
});
