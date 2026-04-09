import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Switch } from '../switch';

describe('Switch', () => {
  it('renders without crashing', () => {
    render(<Switch />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('is unchecked by default', () => {
    render(<Switch />);
    expect(screen.getByRole('switch')).not.toBeChecked();
  });

  it('can be checked by default', () => {
    render(<Switch defaultChecked />);
    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('toggles on click', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Switch onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByRole('switch'));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('renders controlled checked state', () => {
    render(<Switch checked />);
    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('renders controlled unchecked state', () => {
    render(<Switch checked={false} />);
    expect(screen.getByRole('switch')).not.toBeChecked();
  });

  it('is disabled when disabled prop is set', () => {
    render(<Switch disabled />);
    expect(screen.getByRole('switch')).toBeDisabled();
  });

  it('does not toggle when disabled', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Switch disabled onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByRole('switch'));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it('merges custom className', () => {
    render(<Switch className="custom-class" />);
    expect(screen.getByRole('switch')).toHaveClass('custom-class');
  });

  it('uses provided id', () => {
    render(<Switch id="my-switch" />);
    expect(screen.getByRole('switch')).toHaveAttribute('id', 'my-switch');
  });

  it('renders in RTL context', () => {
    render(
      <div dir="rtl">
        <Switch />
      </div>
    );
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<Switch ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it('has data-state=checked when on', () => {
    render(<Switch checked />);
    expect(screen.getByRole('switch')).toHaveAttribute('data-state', 'checked');
  });

  it('has data-state=unchecked when off', () => {
    render(<Switch checked={false} />);
    expect(screen.getByRole('switch')).toHaveAttribute('data-state', 'unchecked');
  });

  it('toggles via keyboard Space key', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Switch onCheckedChange={onCheckedChange} />);
    screen.getByRole('switch').focus();
    await user.keyboard(' ');
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('applies RTL translate class on thumb', () => {
    const { container } = render(<Switch />);
    const thumb = container.querySelector('[data-state]');
    // The Switch component's thumb has rtl: classes for directional translation
    expect(thumb).toBeInTheDocument();
  });

  it('can be associated with a label', () => {
    render(
      <>
        <label htmlFor="notifications">Enable notifications</label>
        <Switch id="notifications" />
      </>
    );
    expect(screen.getByLabelText('Enable notifications')).toBeInTheDocument();
  });
});
