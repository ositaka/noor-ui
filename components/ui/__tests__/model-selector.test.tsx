import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ModelSelector, defaultModels } from '../model-selector';
import { DirectionProvider } from '../../providers/direction-provider';

const renderWithDirection = (ui: React.ReactElement, direction: 'ltr' | 'rtl' = 'ltr') => {
  const locale = direction === 'rtl' ? 'ar' : 'en';
  return render(
    <DirectionProvider controlledDirection={direction} controlledLocale={locale}>
      {ui}
    </DirectionProvider>
  );
};

describe('ModelSelector', () => {
  it('renders without crashing', () => {
    renderWithDirection(<ModelSelector models={defaultModels} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('shows placeholder when no value selected', () => {
    renderWithDirection(
      <ModelSelector models={defaultModels} placeholder="Choose a model" />
    );
    expect(screen.getByText('Choose a model')).toBeInTheDocument();
  });

  it('shows selected model', () => {
    renderWithDirection(
      <ModelSelector models={defaultModels} value="gpt-4" />
    );
    expect(screen.getByText('GPT-4')).toBeInTheDocument();
  });

  it('opens dropdown on click', async () => {
    const user = userEvent.setup();
    renderWithDirection(<ModelSelector models={defaultModels} />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('calls onValueChange when model is selected', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderWithDirection(
      <ModelSelector models={defaultModels} onValueChange={onValueChange} />
    );
    await user.click(screen.getByRole('combobox'));
    // Click on a model in the dropdown
    const items = screen.getAllByRole('option');
    await user.click(items[0]);
    expect(onValueChange).toHaveBeenCalled();
  });

  it('renders in RTL context', () => {
    renderWithDirection(
      <ModelSelector models={defaultModels} />,
      'rtl'
    );
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('merges custom className', () => {
    renderWithDirection(
      <ModelSelector models={defaultModels} className="custom-class" />
    );
    expect(screen.getByRole('combobox')).toHaveClass('custom-class');
  });
});
