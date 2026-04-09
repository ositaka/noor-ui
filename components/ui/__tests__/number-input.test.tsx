import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { NumberInput } from '../number-input';

describe('NumberInput', () => {
  it('renders without crashing', () => {
    render(<NumberInput />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with default value', () => {
    render(<NumberInput defaultValue={42} />);
    expect(screen.getByRole('textbox')).toHaveValue('42');
  });

  it('renders increment and decrement buttons', () => {
    render(<NumberInput />);
    expect(screen.getByRole('button', { name: 'Increase' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Decrease' })).toBeInTheDocument();
  });

  it('increments value on increment button click', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<NumberInput defaultValue={5} onChange={onChange} />);
    await user.click(screen.getByRole('button', { name: 'Increase' }));
    expect(onChange).toHaveBeenCalledWith(6);
  });

  it('decrements value on decrement button click', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<NumberInput defaultValue={5} onChange={onChange} />);
    await user.click(screen.getByRole('button', { name: 'Decrease' }));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it('respects min bound', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<NumberInput defaultValue={0} min={0} onChange={onChange} />);
    // Decrement button should be disabled at min
    const decreaseBtn = screen.getByRole('button', { name: 'Decrease' });
    expect(decreaseBtn).toBeDisabled();
  });

  it('respects max bound', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<NumberInput defaultValue={10} max={10} onChange={onChange} />);
    // Increment button should be disabled at max
    const increaseBtn = screen.getByRole('button', { name: 'Increase' });
    expect(increaseBtn).toBeDisabled();
  });

  it('respects step value', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<NumberInput defaultValue={0} step={5} onChange={onChange} />);
    await user.click(screen.getByRole('button', { name: 'Increase' }));
    expect(onChange).toHaveBeenCalledWith(5);
  });

  it('hides controls when showControls is false', () => {
    render(<NumberInput showControls={false} />);
    expect(screen.queryByRole('button', { name: 'Increase' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Decrease' })).not.toBeInTheDocument();
  });

  it('is disabled when disabled prop is set', () => {
    render(<NumberInput disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Increase' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Decrease' })).toBeDisabled();
  });

  it('renders with controlled value', () => {
    render(<NumberInput value={99} />);
    expect(screen.getByRole('textbox')).toHaveValue('99');
  });

  it('renders in RTL context', () => {
    render(
      <div dir="rtl">
        <NumberInput defaultValue={7} />
      </div>
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
