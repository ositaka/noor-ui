import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { RadioGroup, RadioGroupItem } from '../radio-group';
import { DirectionProvider } from '../../providers/direction-provider';

const renderWithDirection = (ui: React.ReactElement, direction: 'ltr' | 'rtl' = 'ltr') => {
  const locale = direction === 'rtl' ? 'ar' : 'en';
  return render(
    <DirectionProvider controlledDirection={direction} controlledLocale={locale}>
      {ui}
    </DirectionProvider>
  );
};

describe('RadioGroup', () => {
  it('renders without crashing', () => {
    renderWithDirection(
      <RadioGroup>
        <RadioGroupItem value="a" />
        <RadioGroupItem value="b" />
      </RadioGroup>
    );
    expect(screen.getAllByRole('radio')).toHaveLength(2);
  });

  it('selects a value', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderWithDirection(
      <RadioGroup onValueChange={onValueChange}>
        <RadioGroupItem value="option1" />
        <RadioGroupItem value="option2" />
      </RadioGroup>
    );
    await user.click(screen.getAllByRole('radio')[0]);
    expect(onValueChange).toHaveBeenCalledWith('option1');
  });

  it('renders with a default value', () => {
    renderWithDirection(
      <RadioGroup defaultValue="b">
        <RadioGroupItem value="a" />
        <RadioGroupItem value="b" />
      </RadioGroup>
    );
    const radios = screen.getAllByRole('radio');
    expect(radios[1]).toBeChecked();
  });

  it('renders with controlled value', () => {
    renderWithDirection(
      <RadioGroup value="a">
        <RadioGroupItem value="a" />
        <RadioGroupItem value="b" />
      </RadioGroup>
    );
    expect(screen.getAllByRole('radio')[0]).toBeChecked();
    expect(screen.getAllByRole('radio')[1]).not.toBeChecked();
  });

  it('disables individual items', () => {
    renderWithDirection(
      <RadioGroup>
        <RadioGroupItem value="a" disabled />
        <RadioGroupItem value="b" />
      </RadioGroup>
    );
    expect(screen.getAllByRole('radio')[0]).toBeDisabled();
    expect(screen.getAllByRole('radio')[1]).not.toBeDisabled();
  });

  it('disables all items when group is disabled', () => {
    renderWithDirection(
      <RadioGroup disabled>
        <RadioGroupItem value="a" />
        <RadioGroupItem value="b" />
      </RadioGroup>
    );
    screen.getAllByRole('radio').forEach(radio => {
      expect(radio).toBeDisabled();
    });
  });

  it('merges custom className on group', () => {
    renderWithDirection(
      <RadioGroup className="custom-group" data-testid="group">
        <RadioGroupItem value="a" />
      </RadioGroup>
    );
    expect(screen.getByTestId('group')).toHaveClass('custom-group');
  });

  it('renders in RTL context', () => {
    renderWithDirection(
      <RadioGroup>
        <RadioGroupItem value="a" />
        <RadioGroupItem value="b" />
      </RadioGroup>,
      'rtl'
    );
    expect(screen.getAllByRole('radio')).toHaveLength(2);
  });
});
