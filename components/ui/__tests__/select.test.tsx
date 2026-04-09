import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from '../select';
import { DirectionProvider } from '../../providers/direction-provider';

const renderWithDirection = (ui: React.ReactElement, direction: 'ltr' | 'rtl' = 'ltr') => {
  const locale = direction === 'rtl' ? 'ar' : 'en';
  return render(
    <DirectionProvider controlledDirection={direction} controlledLocale={locale}>
      {ui}
    </DirectionProvider>
  );
};

const TestSelect = ({ onValueChange, defaultValue, disabled }: {
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  disabled?: boolean;
}) => (
  <Select onValueChange={onValueChange} defaultValue={defaultValue} disabled={disabled}>
    <SelectTrigger>
      <SelectValue placeholder="Select option" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
      <SelectItem value="cherry">Cherry</SelectItem>
    </SelectContent>
  </Select>
);

describe('Select', () => {
  it('renders trigger with placeholder', () => {
    renderWithDirection(<TestSelect />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Select option')).toBeInTheDocument();
  });

  it('opens dropdown on click', async () => {
    const user = userEvent.setup();
    renderWithDirection(<TestSelect />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
    expect(screen.getByText('Cherry')).toBeInTheDocument();
  });

  it('selects an item', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderWithDirection(<TestSelect onValueChange={onValueChange} />);
    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByText('Banana'));
    expect(onValueChange).toHaveBeenCalledWith('banana');
  });

  it('renders with default value', () => {
    renderWithDirection(<TestSelect defaultValue="cherry" />);
    expect(screen.getByText('Cherry')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is set', () => {
    renderWithDirection(<TestSelect disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('does not open when disabled', async () => {
    const user = userEvent.setup();
    renderWithDirection(<TestSelect disabled />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('renders SelectGroup and SelectLabel', async () => {
    const user = userEvent.setup();
    renderWithDirection(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Pick fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByText('Fruits')).toBeInTheDocument();
  });

  it('merges custom className on trigger', () => {
    renderWithDirection(
      <Select>
        <SelectTrigger className="custom-trigger">
          <SelectValue placeholder="Test" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">A</SelectItem>
        </SelectContent>
      </Select>
    );
    expect(screen.getByRole('combobox')).toHaveClass('custom-trigger');
  });

  it('renders in RTL context', () => {
    renderWithDirection(<TestSelect />, 'rtl');
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});
